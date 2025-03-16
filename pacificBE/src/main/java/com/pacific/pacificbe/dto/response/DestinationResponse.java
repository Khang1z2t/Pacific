package com.pacific.pacificbe.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestinationResponse {
    private String id;
    private String city;
    private String country;
    private String fullAddress;
    private String name;
    private String region;
}
