package com.shop31.mapper;

import com.shop31.pojo.Product;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ProductMapper {
    List<Product> queryProductList();
    Product queryProductById(String id);
    void addProd(Product prod);
    void deleteProdById(String id);
}
