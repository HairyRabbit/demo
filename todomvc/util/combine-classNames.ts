export default function combineClassNames(...classNames: (string | boolean | null | undefined)[]): string {
  return classNames
    .filter((className): className is string => `string` === typeof className && '' !== className)
    .join(' ')
}