package com.example.sample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping({"/", "/login", "/logout", "/index", "/index.html", "/employee/**"})
    public String index() {
        return "index";
    }
}
