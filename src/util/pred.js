import {hasLength} from '@s-e/frontend/pred';
import {not, curry, propSatisfies, isSame, Maybe} from 'crocks';

export const gt = curry((a, b) => a < b);
export const lt = curry((a, b) => a > b);
export const gte = curry((a, b) => a <= b);
export const lte = curry((a, b) => a >= b);

export const hasntLength = not(hasLength);
export const lengthOp = curry((op, a, foldable) =>
  propSatisfies('length', op(a), foldable),
);
export const lengthGt = lengthOp(gt);
export const lengthLt = lengthOp(lt);
export const lengthGte = lengthOp(gte);
export const lengthLte = lengthOp(lte);

export const mPredCmp = curry((pred, m, lens, value) => (
  Maybe.of(pred)
  .ap(lens(value))
  .ap(m)
));

export const mIsSame = mPredCmp(isSame);
