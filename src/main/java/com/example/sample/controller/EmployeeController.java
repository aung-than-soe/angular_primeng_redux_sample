package com.example.sample.controller;

import com.example.sample.domain.Employee;
import com.example.sample.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("all")
    public List<Employee> getAllEmployee() {
        return this.employeeService.findALl();
    }

    @GetMapping("{id}")
    public Employee findEmployeeById(@PathVariable("id") int id) {
        return this.employeeService.findById(id).orElseGet(Employee::new);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Employee createOrUpdate(@RequestBody Employee employee) {
       return this.employeeService.create(employee);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEmployeeById(@PathVariable("id") int id) {
        this.employeeService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
