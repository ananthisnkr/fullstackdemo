package com.data.statistics.visualization.model;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Data {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "end_year")
    private int endYear;
    @Column(name = "city_longitute")
    private String citylng;
    @Column(name = "city_latitude")
    private String citylat;
    private int intensity;
    private String sector;

    private String topic;
    @Column(length = 340)
    private String insight;
    private String swot;
    private String url;
    private String region;
    private int startYear;
    private int impact;
    @Column(name = "added_dt")
    private LocalDateTime added;
    @Column(name = "published_dt")
    private LocalDateTime published;

    private String city;
    private String country;
    private int relevance;
    private String pestle;
    private String source;
    @Column(length = 340)
    private String title;
    private int likelihood;

}