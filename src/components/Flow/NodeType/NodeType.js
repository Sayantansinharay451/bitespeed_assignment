import { memo } from "react";
import TextNode from "./TextNode/TextNode";

export const nodeTypes = {
    textNode: memo(TextNode),
};
