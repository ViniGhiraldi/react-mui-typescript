import { FormHandles } from '@unform/core';
import { useRef, useCallback } from 'react';


export const useVForm = () => {
    const formRef = useRef<FormHandles>(null);

    const isSavingAndBack = useRef(false);
    const isSavingAndNew = useRef(false);

    const handleSave = useCallback(() => {
        isSavingAndBack.current = false;
        isSavingAndNew.current = false;
        formRef.current?.submitForm();
    }, []);
    const handleSaveAndNew = useCallback(() => {
        isSavingAndBack.current = false;
        isSavingAndNew.current = true;
        formRef.current?.submitForm();
    }, []);
    const handleSaveAndBack = useCallback(() => {
        isSavingAndBack.current = true;
        isSavingAndNew.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleIsSaveAndNew = useCallback(() => {
        return isSavingAndNew.current;
    }, []);
    const handleIsSaveAndBack = useCallback(() => {
        return isSavingAndBack.current;
    }, []);

    return {
        formRef,

        save: handleSave,
        saveAndNew: handleSaveAndNew,
        saveAndBack: handleSaveAndBack,
        isSaveAndNew: handleIsSaveAndNew,
        isSaveAndBack: handleIsSaveAndBack,
    };
}