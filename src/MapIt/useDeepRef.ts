import deepEqual from 'dequal';
import { useRef } from 'react';

export default function useDeepRef(value: any): any {
  const ref = useRef<any>();

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}
