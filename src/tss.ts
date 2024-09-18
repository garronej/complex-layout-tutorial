
import { createTss, GlobalStyles } from "tss-react";
export { GlobalStyles };


export const { tss } = createTss({
    useContext: function useContext(){
        return {};
    }
}); 

export const useStyles = tss.create({});