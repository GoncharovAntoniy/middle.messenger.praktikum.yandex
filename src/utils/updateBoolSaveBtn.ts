export const updateBoolSaveBtn = (currentThis: any, value: boolean) => {
  currentThis.setProps({
    ...currentThis.props,
    props: {
      ...currentThis.props.props,
      contextProfile: {
        ...currentThis.props.props.contextProfile,
        saveButton: value,
      },
    },
  });
};
