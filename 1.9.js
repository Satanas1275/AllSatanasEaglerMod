ModAPI.meta.title("Minecraft 1.9 Features");
ModAPI.meta.credits("By Satanas1275");
ModAPI.meta.icon("data:image/png;base64,...");  // Remplace par une icône en base64
ModAPI.meta.description("Ajoute les fonctionnalités de Minecraft 1.9, telles que les boucliers, élytres, etc.");

ModAPI.addEventListener("lib:libcustomitems:loaded", () => {
    console.log("Registered custom 1.9 items.");
    
    // Ajouter un bouclier
    LibCustomItems.registerItem({
        tag: "custom:shield",
        base: "iron_ingot",
        name: "Bouclier",
        qty: 1,
        recipe: [
            " # ",
            "#X#",
            " # "
        ],
        recipeLegend: {
            "#": {
                "type": "item",
                "id": "iron_ingot"
            },
            "X": {
                "type": "item",
                "id": "wooden_plank"
            }
        },
        onRightClick: `/*/user, world, itemstack/*/
        user.addChatMessage(ModAPI.reflect.getClassById("net.minecraft.util.ChatComponentText").constructors[0](ModAPI.util.str("Vous avez utilisé le bouclier!")));
        return true;
        `
    });

    // Ajouter une élytre
    LibCustomItems.registerItem({
        tag: "custom:elytra",
        base: "feather",
        name: "Elytre",
        qty: 1,
        onRightClick: `/*/user, world, itemstack/*/
        user.addChatMessage(ModAPI.reflect.getClassById("net.minecraft.util.ChatComponentText").constructors[0](ModAPI.util.str("Élytre activé!")));
        user.setFlying(true);  // Activer le vol avec l'élytre
        return true;
        `
    });
    
    // Ajouter le bloc Purpur
    LibCustomItems.registerBlock({
        tag: "custom:purpur_block",
        base: "stone",
        name: "Bloc Purpur",
        texture: "purpur_block_texture",  // Ajouter la texture dans tes assets
        hardness: 1.5,
    });

    // Ajouter des flèches spéciales (Flèche de poison)
    LibCustomItems.registerItem({
        tag: "custom:poison_arrow",
        base: "arrow",
        name: "Flèche de Poison",
        qty: 1,
        onHit: `/*/target/*/
        target.addPotionEffect(new PotionEffect(Potion.poison.id, 200, 1));  // Applique un effet de poison
        return true;
        `
    });
});

// Système de cooldown pour les attaques
ModAPI.addEventListener("player:attack", (event) => {
    const player = event.player;
    const lastAttackTime = player.getLastAttackTime();
    const currentTime = Date.now();

    if (currentTime - lastAttackTime < 1000) {  // Temps de récupération de 1 seconde
        player.addChatMessage(ModAPI.reflect.getClassById("net.minecraft.util.ChatComponentText").constructors[0](ModAPI.util.str("Cooldown! Attendez avant de frapper à nouveau!")));
        event.preventDefault = true;  // Empêche l'attaque si le cooldown n'est pas terminé
    } else {
        player.setLastAttackTime(currentTime);
    }
});
