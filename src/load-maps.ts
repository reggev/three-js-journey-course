import {LoadingManager, TextureLoader, Texture} from 'three'

export async function loadMaps<T extends string>(
  maps: Record<T, string>,
): Promise<Record<T, Texture>> {
  const loadingManager = new LoadingManager()

  loadingManager.onError = () => {
    console.info('loadingManager error')
  }
  loadingManager.onLoad = () => {
    console.info('loadingManager finished loading')
  }
  loadingManager.onProgress = (url, loaded, total) => {
    console.info(url)
    console.info(`loadingManager loaded ${(((1.0 * loaded) / total) * 100).toFixed(0)}%`)
  }

  const textureLoader = new TextureLoader(loadingManager)

  return Object.fromEntries(
    await Promise.all(
      Object.entries(maps).map(async ([key, url]) => [
        key,
        await textureLoader.loadAsync(url as string),
      ]),
    ),
  )
}
