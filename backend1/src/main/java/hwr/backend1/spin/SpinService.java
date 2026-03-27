package hwr.backend1.spin;

import hwr.backend1.spin.dto.SpinRequestDTO;
import hwr.backend1.spin.dto.SpinResponseDTO;

import java.util.List;

public interface SpinService {
    SpinResponseDTO spin(SpinRequestDTO request);

    List<SpinResponseDTO> getSpinHistory();
}
