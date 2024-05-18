import shortUUID from 'short-uuid'


const translator = shortUUID()

export const shortenUUID = (uuid: string) => translator.fromUUID(uuid)

export const expandUUID = (shortUUID: string) => translator.toUUID(shortUUID)
