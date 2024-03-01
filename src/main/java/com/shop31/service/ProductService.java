package com.shop31.service;

import com.shop31.mapper.ProductMapper;
import com.shop31.pojo.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductMapper prodMapper;

    public List<Product> queryProductList(){
        return prodMapper.queryProductList();
    }
    public Product queryProductById(String pid){
        Product prod = prodMapper.queryProductById(pid);
        return prod;
    }
    public String addProd(Product prod){
        prodMapper.addProd(prod);
        return "successfully add product";
    }
    public String deleteProdById(String pid){
        prodMapper.deleteProdById(pid);
        return "successfully delete product";
    }
}
