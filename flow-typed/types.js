// just to fix HMR, you should prob modularize these custom types

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
}
