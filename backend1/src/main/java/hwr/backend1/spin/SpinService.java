package hwr.backend1.spin;

import hwr.backend1.spin.dto.SpinRequestDTO;
import hwr.backend1.spin.dto.SpinResponseDTO;

public interface SpinService {
    SpinResponseDTO spin(SpinRequestDTO request);
}
