package com.shop31.pojo;

public class Product {
    private String pid;
    private String catid;
    private String prodName;
    private int price;
    private String description;
    private String mainimage;

    public String getMainimage() {
        return mainimage;
    }

    public void setMainimage(String mainimage) {
        this.mainimage = mainimage;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getCatid() {
        return catid;
    }

    public void setCatid(String catid) {
        this.catid = catid;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
