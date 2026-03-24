export const renderTextWithLineBreaks = (text: string | undefined) => {
    if (!text) return null;
    return text.split('\\n').map((line, index, array) => (
        <span key={index}>
            {line}
            {index < array.length - 1 && <br />}
        </span>
    ));
};
