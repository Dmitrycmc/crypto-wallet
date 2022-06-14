const endsWithZero = (big: BigInt): boolean => {
    const str = big.toString();
    return str[str.length - 1] === '0';
};

export const fromUsdtWei = (balance: string, decimals: string): string => {
    const pow = 10 ** Number(decimals);
        const integerPart = BigInt(balance) / BigInt(pow);
        let fractionalPart = BigInt(balance) - BigInt(pow) * integerPart;

        if (fractionalPart === BigInt(0)) {
            return integerPart.toString();
        }

        while (endsWithZero(fractionalPart)) {
            fractionalPart /= BigInt(10);
        }

        return `${integerPart}.${fractionalPart}`;
}