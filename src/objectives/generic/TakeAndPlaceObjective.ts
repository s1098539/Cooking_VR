import {AObjective} from "../AObjective";
import {Vec3} from "../../Vec3";
import {AInteractable} from "../../Interactables/AInteractable";
import {Box} from "../../Interactables/Box";

export class TakeAndPlaceObjective extends AObjective {
    target: AInteractable;

    constructor(
        private target_id: string,
        private target_position: Vec3,
        private where: string,
        private size: number = 15,
        instruction_pos: Vec3 = new Vec3(0,1.5,-8),
        instruction_rot: Vec3 = new Vec3(0,0,0)
    ) {
        super(`Take the ${target_id}.`, instruction_pos, instruction_rot)
    }

    protected onDestroy(): void {
        this.marker.hide();
    }

    protected onInit(): void {
        this.instruction.setSize(this.size);

        this.target = new AInteractable(this.target_id, () => {
            this.target.stopListening();

            this.player.equip(this.target);
            this.instruction.showMessage(`Place it\n${this.where}.`, this.instruction_pos, this.instruction_rot);
            this.instruction.setSize(this.size);

            const box = new Box(
                this.target_position,
                null,
                () => {
                    this.instruction.setSize(15);
                    box.stopListening();
                    this.progressObjective();
                    this.player.drop(this.target_position);
                    box.remove();

                }
            );

            this.marker.showAt(this.target_position);
        });


        this.marker.showAt(this.target.getPosition());
    }

}