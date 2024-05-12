export type ImageRestore = {
  id: string
  url: string
  name: string
  function?: () => void
  function2?: () => void
}

export type ImageRestoreCompare = {
  id: string
  url_after: string
  url_before: string
  name_after: string
  name_before: string
  function?: () => void
  function2?: () => void
}
