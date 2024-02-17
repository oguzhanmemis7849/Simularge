export const simplifyFirestoreData = (data) => {

    const simplifyField = (field) => {
        const simplified = {};
        Object.keys(field).forEach(key => {
            const value = field[key];
            if (value?.mapValue?.fields) {
                simplified[key] = simplifyField(value.mapValue.fields);
            } else if (value.stringValue || value.stringValue === "") {
                simplified[key] = value.stringValue;
            } else if (value.booleanValue !== undefined) {
                simplified[key] = value.booleanValue;
            }
        });
        return simplified;
    }

    const simplifiedData = {};
    Object.keys(data).forEach(key => {
        if (key === 'user') {
            simplifiedData[key] = data[key].stringValue;
        } else if (data[key]?.mapValue?.fields) {
            simplifiedData[key] = simplifyField(data[key].mapValue.fields);
        }
    });

    return simplifiedData;
};
