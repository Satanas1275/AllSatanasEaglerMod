ModAPI.meta.title("Minecraft 1.9 Features");
ModAPI.meta.credits("By Satanas1275");
ModAPI.meta.icon("data:image/png;base64,...");  // Remplace par une icône en base64
ModAPI.meta.description("Ajoute les fonctionnalités de Minecraft 1.9, telles que les boucliers, élytres, etc.");

//This mod also requires lib.customitems.js
ModAPI.addEventListener("lib:libcustomitems:loaded", () => {
    console.log("Registered my cool custom item.");
    LibCustomItems.registerItem({
        tag: "custom:dirt",
        base: "magma_cream",
        name: "Custom dirt",
        qty: 32,
        useRecipe: true,
        recipe: [
            "###",
            "# #",
            "###"
        ],
        recipeLegend: {
            "#": {
                "type": "block",
                "id": "dirt"
            }
        },
        //Optional: onRightClickGround
        onRightClickGround: `/*/user, world, itemstack, blockpos/*/
        itemstack.stackSize -= 1;
        if (itemstack.stackSize < 1) {
            user.inventory.mainInventory[user.inventory.currentItem] = null;
        }
        user.setHealth(2);
        return true; //PreventDefault
        `,
        //Optional: onLeftClickGround
        onLeftClickGround: `/*/user, world, itemstack, blockpos/*/
        itemstack.stackSize -= 1;
        if (itemstack.stackSize < 1) {
            user.inventory.mainInventory[user.inventory.currentItem] = null;
        }
        user.setHealth(20);
        return true; //PreventDefault
        `,
        //Optional: craftingExtra
        craftingExtra: `/*/itemstack/*/
        let enchant = ModAPI.reflect.getClassByName("Enchantment").staticMethods.getEnchantmentById.method(5); //ENCHANTMENT_OXYGEN (respiration)
        itemstack.addEnchantment(enchant);
        `,
    });
});
