package com.example.sample.domain;

import com.example.sample.domain.enums.Department;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor(onConstructor = @__(@PersistenceConstructor))
public class Employee implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String address;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Department department;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return id.equals(employee.id) && name.equals(employee.name) && Objects.equals(address, employee.address) && Objects.equals(phone, employee.phone) && department == employee.department;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, address, phone, department);
    }
}
