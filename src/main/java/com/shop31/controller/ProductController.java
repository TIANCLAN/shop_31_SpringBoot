/*
 * Copyright 2013-2018 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.shop31.controller;

import com.shop31.pojo.Product;
import com.shop31.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    // http://127.0.0.1:8080/hello?name=lisi
    @RequestMapping("/hello")
    @ResponseBody
    public String hello(@RequestParam(name = "name", defaultValue = "unknown user") String name) {
        return "Hello " + name;
    }

    @Autowired
    ProductService prodService;

    @GetMapping("/queryProductList")
    public List<Product> queryProductList(){
        return prodService.queryProductList();
    }
    @GetMapping(value = "/queryProductById/{pid}")
    public Product queryProductById(@PathVariable(value = "pid") String pid){
        return prodService.queryProductById(pid);
    }
    @PostMapping("/addProd")
    public String addProd(@RequestBody Product prod){
        prodService.addProd(prod);
        return prodService.addProd(prod);
    }
    @GetMapping("/deleteProdById/{pid}")
    public String deleteProdById(@PathVariable(value = "pid") String pid){
        return  prodService.deleteProdById(pid);
    }

}
