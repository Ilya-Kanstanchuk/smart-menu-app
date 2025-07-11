package com.ilyaproject.smart_menu_server.dto.menu.json;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ilyaproject.smart_menu_server.dto.menu.json.MenuDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecipesDTO {
    @JsonProperty("menu")
    private List<MenuDTO> menu;
}