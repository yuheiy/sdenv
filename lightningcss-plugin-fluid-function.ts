import type { CustomAtRules, LengthValue, TokenOrValue, Visitor } from 'lightningcss';
import invariant from 'tiny-invariant';

function splitBy<T>(array: T[], predicate: (element: T) => boolean) {
  return array
    .reduce<T[][]>(
      (acc, element) => {
        if (predicate(element)) {
          acc.push([]);
        } else {
          acc[acc.length - 1].push(element);
        }
        return acc;
      },
      [[]],
    )
    .filter((group) => group.length > 0);
}

type Breakpoint = `${number}px` | `${number}rem`;

const BREAKPOINT_RE = /^(\d*\.?\d+)(px|rem)?$/;

function parseBreakpoint(breakpoint: Breakpoint) {
  const matches = BREAKPOINT_RE.exec(breakpoint);

  if (matches) {
    const [, value, unit] = matches;
    return {
      type: 'length',
      value: {
        unit: unit as 'px' | 'rem',
        value: Number(value),
      },
    } as TokenOrValue;
  }
}

function isValidLength(x: TokenOrValue): x is {
  type: 'length';
  value: LengthValue;
} {
  return x.type === 'length' && (x.value.unit === 'px' || x.value.unit === 'rem');
}

export default function fluidVisitor({
  defaultStartBreakpoint,
  defaultEndBreakpoint,
  namedBreakpoints = {},
  rootFontSizePixel = 16,
  precision = 5,
}: Partial<{
  defaultStartBreakpoint: Breakpoint;
  defaultEndBreakpoint: Breakpoint;
  namedBreakpoints: Record<string, Breakpoint>;
  rootFontSizePixel: number;
  precision: number;
}> = {}) {
  function toPrecision(n: number) {
    return Number(n.toFixed(precision));
  }

  return {
    Function: {
      '--fluid'(fn) {
        const splittedByComma = splitBy(
          fn.arguments,
          ({ type, value }) => type === 'token' && value.type === 'comma',
        );

        if (splittedByComma.length !== 2) return;

        const relevantNodes = [] as TokenOrValue[];

        for (const nodes of splittedByComma) {
          // fluid size only, not including a breakpoint
          if (nodes.length === 1 && nodes[0].type === 'length') {
            const isHead = nodes === splittedByComma[0];
            const defaultBreakpoint = isHead
              ? defaultStartBreakpoint && parseBreakpoint(defaultStartBreakpoint)
              : defaultEndBreakpoint && parseBreakpoint(defaultEndBreakpoint);
            if (!defaultBreakpoint) return;
            relevantNodes.push(defaultBreakpoint, nodes[0]);
            continue;
          }

          // breakpoint name and fluid size
          if (
            nodes.length === 3 &&
            nodes[0].type === 'token' &&
            nodes[0].value.type === 'ident' &&
            nodes[1].type === 'token' &&
            nodes[1].value.type === 'white-space' &&
            nodes[2].type === 'length'
          ) {
            const namedBreakpoint =
              namedBreakpoints &&
              nodes[0].value.value in namedBreakpoints &&
              parseBreakpoint(namedBreakpoints[nodes[0].value.value]);
            if (!namedBreakpoint) return;
            relevantNodes.push(namedBreakpoint, nodes[2]);
            continue;
          }

          // breakpoint length and fluid size
          if (
            nodes.length === 3 &&
            nodes[0].type === 'length' &&
            nodes[1].type === 'token' &&
            nodes[1].value.type === 'white-space' &&
            nodes[2].type === 'length'
          ) {
            relevantNodes.push(nodes[0], nodes[2]);
            continue;
          }

          return;
        }

        invariant(relevantNodes.length === 4);

        const [startBreakpoint, startFluidSize, endBreakpoint, endFluidSize] = relevantNodes;

        if (!isValidLength(startBreakpoint)) return;
        if (!isValidLength(startFluidSize)) return;
        if (!isValidLength(endBreakpoint)) return;
        if (!isValidLength(endFluidSize)) return;

        if (startBreakpoint.value.value <= 0) return;
        if (endBreakpoint.value.value <= 0) return;

        if (startFluidSize.value.unit !== endFluidSize.value.unit) return;
        if (startFluidSize.value.value === endFluidSize.value.value) return startFluidSize;

        if (
          startBreakpoint.value.unit === endBreakpoint.value.unit &&
          startBreakpoint.value.value === endBreakpoint.value.value
        )
          return;

        const [startBreakpointPixel, startFluidSizePixel, endBreakpointPixel, endFluidSizePixel] = [
          startBreakpoint,
          startFluidSize,
          endBreakpoint,
          endFluidSize,
        ].map((x) => (x.value.unit === 'px' ? x.value.value : x.value.value * rootFontSizePixel));

        const v =
          (100 * (endFluidSizePixel - startFluidSizePixel)) /
          (endBreakpointPixel - startBreakpointPixel);
        const r =
          (startBreakpointPixel * endFluidSizePixel - endBreakpointPixel * startFluidSizePixel) /
          (startBreakpointPixel - endBreakpointPixel);

        const withUnit =
          startFluidSize.value.unit === 'px'
            ? (pixelValue: number) => `${toPrecision(pixelValue)}px`
            : (pixelValue: number) => `${toPrecision(pixelValue / rootFontSizePixel)}rem`;

        let central = `${toPrecision(v)}vi`;
        if (r !== 0) {
          central += ` ${Math.sign(r) >= 0 ? '+' : '-'} ${withUnit(r)}`;
        }

        const [minimumValue, maximumValue] = [startFluidSizePixel, endFluidSizePixel].toSorted();

        return {
          // TODO: rawじゃなくする
          raw: `clamp(${[withUnit(minimumValue), central, withUnit(maximumValue)].join(', ')})`,
        };
      },
    },
  } satisfies Visitor<CustomAtRules>;
}
