import { useState } from "react";

function useForm() {
    const [isOpen, setIsOpen] = useState(false)
    const open = () => {
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
    }
    return {isOpen, open, close}
}

export default useForm;