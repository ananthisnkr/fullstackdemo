package com.data.statistics.visualization.requestresponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ApiRequest {

    int pageNumber;
    int pageSize;
    FilterData filterData;
}