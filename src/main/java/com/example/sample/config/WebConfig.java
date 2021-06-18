package com.example.sample.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.EncodedResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**", "**.js", "**.css", "**.ttf", "*.woff")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.noCache())
                .setCachePeriod(60 * 60)
                .resourceChain(true)
                .addResolver(new EncodedResourceResolver());
    }
}
