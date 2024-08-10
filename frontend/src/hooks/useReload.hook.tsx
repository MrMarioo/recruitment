import { useState } from "react"

export const useReload = () => {
    const [reloadKey, setReloadKey] = useState(Math.random);

    const reloadPage = () => {
        setReloadKey(Math.random());
    }

    return {reloadKey, reloadPage};
}
