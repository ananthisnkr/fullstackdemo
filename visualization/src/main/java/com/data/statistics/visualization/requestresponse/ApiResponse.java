package com.data.statistics.visualization.requestresponse;

import com.data.statistics.visualization.model.Data;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ApiResponse {
    Long count;
    List<Data> data;
}