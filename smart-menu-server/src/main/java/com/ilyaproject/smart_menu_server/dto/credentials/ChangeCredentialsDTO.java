package com.ilyaproject.smart_menu_server.dto.credentials;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class ChangeCredentialsDTO {
    @Email
    @NotBlank
    private String email;

    @Size(min = 8)
    private String password;
}
