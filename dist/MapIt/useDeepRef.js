import deepEqual from 'dequal';
import { useRef } from 'react';
export default function useDeepRef(value) {
  var ref = useRef();

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}