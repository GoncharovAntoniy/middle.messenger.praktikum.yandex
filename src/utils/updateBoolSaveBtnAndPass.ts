import { FieldInfoProfile } from "../pages/profile/components/fieldInfoProfile"

export const updateBoolSaveBtnAndPass = (currentThis, value) => {
    currentThis.setProps({
        ...currentThis.props, props: {
            ...currentThis.props.props, contextProfile: {
                ...currentThis.props.props.contextProfile, saveButton: value, updatePass: value
            }
        }
    })

    const FieldsInfoProfile = value ? currentThis.props.props.fieldsPass.map((item) => (
        new FieldInfoProfile({
            id: item.id,
            name: item.name,
            nameField: item.nameField,
            typeInput: item.typeInput,
            value: item.value
        })
    )) : currentThis.props.props.fields.map((item) => (
        new FieldInfoProfile({
            id: item.id,
            name: item.name,
            nameField: item.nameField,
            typeInput: item.typeInput,
            value: item.value,
            disabled: item.disabled
        })
    ))
    currentThis.setLists({ FieldsInfoProfile })
}