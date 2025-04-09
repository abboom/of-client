import JSEncrypt from 'jsencrypt'
export function encrypt(pwd: string): string {
  const encryptor = new JSEncrypt()

  encryptor.setPublicKey(PUBLIC_ENCRYPT_KRY) // 设置公钥

  return encryptor.encrypt(pwd) as string // 对需要加密的数据进行加密
}
