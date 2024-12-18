export const updateBoolSaveBtn = (currentThis, value) => {
    currentThis.setProps({
        ...currentThis.props, props: {
            ...currentThis.props.props, contextProfile: {
                ...currentThis.props.props.contextProfile, saveButton: value
            }
        }
    })
}