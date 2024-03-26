package com.shop31.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class mainController {
    @RequestMapping("/mainpage")
    public String Index() {
        return "redirect:/index.html";
    }
}