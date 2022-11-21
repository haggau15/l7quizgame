import * as React from "react";
import {createRoot} from "react-dom/client";
import {FrontPage} from "../frontpage";
import {act} from "react-dom/test-utils";
import { Simulate } from "react-dom/test-utils";
import * as ReactDOM from "react-dom";


describe("client test suite", () =>{
    it("Frontpage is rendered", ()=> {
        const element=document.createElement("div");
        const root = createRoot(element);
        act(()=>{
            root.render(<FrontPage/>);
        })
        //test code
        expect(element.querySelector("h1")?.innerHTML).toEqual("Front Page");
        expect(element.innerHTML).toMatchSnapshot();
    });
});