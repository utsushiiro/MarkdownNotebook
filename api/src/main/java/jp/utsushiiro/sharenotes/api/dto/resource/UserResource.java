package jp.utsushiiro.sharenotes.api.dto.resource;

import jp.utsushiiro.sharenotes.api.domain.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResource {

    private String id;

    private String name;

    private String email;

    public UserResource(User user) {
        this.id = user.getId().toString();
        this.name = user.getName();
        this.email = user.getEmail();
    }
}
