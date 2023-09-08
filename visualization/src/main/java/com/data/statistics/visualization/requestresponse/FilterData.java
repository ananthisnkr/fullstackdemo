package com.data.statistics.visualization.requestresponse;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FilterData {
    Integer endYear;
    String topic;
    String sector;
    String region;
    String pestle;
    String source;
    String swot;
    String country;
    String city;

}