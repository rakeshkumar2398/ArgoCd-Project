package com.devops.chaikafe.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderItemRequest {
    private Long menuItemId;
    private Integer quantity;
}
