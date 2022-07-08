import { Hasher } from '@/data/protocols/criptography/hasher'
import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

export const mockHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('any_password')
    }
  }

  return new HasherStub()
}

export const mockDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }
  return new DecrypterStub()
}

export const mockEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('any_token')
    }
  }

  return new EncrypterStub()
}

export const mockHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }

  return new HashComparerStub()
}
