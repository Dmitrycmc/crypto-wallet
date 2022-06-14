export const fromUsdtoWei = (balance: string, decimals: string): string => {
    const pow = 10 ** Number(decimals);
    const integerPart = BigInt(balance) / BigInt(pow);
    const fractionalPart = BigInt(balance) - BigInt(pow) * integerPart;

    if (fractionalPart === BigInt(0)) {
        return integerPart.toString();
    }

    let fractionalPartStr = fractionalPart.toString();

    while (fractionalPartStr.length < Number(decimals)) {
        fractionalPartStr = '0' + fractionalPartStr;
    }

    while (fractionalPartStr[fractionalPartStr.length - 1] === '0') {
        fractionalPartStr = fractionalPartStr.slice(0, -1);
    }

    return `${integerPart}.${fractionalPartStr}`;
};