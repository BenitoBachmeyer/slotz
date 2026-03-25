package hwr.backend1.settings.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record DemoBalanceRequestDTO(
        @NotNull
        @Min(0)
        @Max(1_000_000)
        Long demoCredits
) {}
