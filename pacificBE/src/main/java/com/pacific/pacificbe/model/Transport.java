package com.pacific.pacificbe.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@Entity
@Table(name = "transport")
public class Transport {
    @Id
    @Size(max = 255)
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_id")
    private Tour tour;

    @Size(max = 255)
    @Nationalized
    @Column(name = "transport_type")
    private String transportType;

    @Column(name = "capacity")
    private Integer capacity;

    @Size(max = 255)
    @Nationalized
    @Column(name = "status")
    private String status;

}