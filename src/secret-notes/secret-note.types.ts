export interface ISecretNoteMetaData {
  id: number;
  createdAt: Date;
}

export interface ISecretNoteExposed {
  id: number;
  note?: string;
  createdAt: Date;
  encryptionIv?: string;
}
