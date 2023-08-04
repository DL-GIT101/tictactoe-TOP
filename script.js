const Cell = () => {

    let value = 1;

    const changeValue = (token) => {
        value = token;
    }

    const getValue = () => value;

    return {
        changeValue,getValue
    };
};

