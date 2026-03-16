const provinceFoodData = {
    // Miền Bắc (25 tỉnh thành)
    "Hà Nội": {
        "dish": "Phở Bò Hà Nội",
        "region": "North",
        "description": "Món ăn biểu tượng với nước dùng thanh ngọt, thịt bò mềm và bánh phở trắng ngần.",
        "story": "Phở không chỉ là món ăn, mà là một tác phẩm nghệ thuật ẩm thực. Có nguồn gốc từ đầu thế kỷ 20, Phở Hà Nội gắn liền với những gánh hàng rong xưa, mang trong mình linh hồn của người Tràng An hào hoa.",
        "image": "https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&h=400&fit=crop"
    },
    "Hà Giang": {
        "dish": "Cháo Ấu Tẩu",
        "region": "North",
        "description": "Món cháo độc đáo nấu từ củ ấu tẩu, có vị đắng nhẹ nhưng hậu ngọt.",
        "story": "Được mệnh danh là món 'cháo độc dược' vì củ ấu tẩu có độc, nhưng qua bàn tay chế biến tài tình của người dân tộc Mông, nó trở thành bài thuốc quý giải cảm và bồi bổ sức khỏe.",
        "image": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&h=400&fit=crop"
    },
    "Cao Bằng": {
        "dish": "Vịt Quay 7 Vị",
        "region": "North",
        "description": "Vịt quay với công thức ướp 7 loại gia vị đặc trưng vùng Đông Bắc.",
        "story": "Số 7 là con số may mắn của người Tày ở Cao Bằng. Vịt được chọn là vịt bầu Thất Khê, ướp cùng quả mác mật tạo nên hương thơm lan tỏa núi rừng.",
        "image": "img/vitquay7vi.jpg"
    },
    "Bắc Kạn": {
        "dish": "Bánh Gio (Bánh Tro)",
        "region": "North",
        "description": "Bánh làm từ gạo nếp ngâm nước tro tro trong veo, dẻo thơm.",
        "story": "Bánh Gio Bắc Kạn gắn liền với đôi bàn tay khéo léo của người phụ nữ dân tộc Tày. Cho vào miệng, vị ngọt thanh của mật mía tạo cảm giác dịu mát như sương núi.",
        "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
    },
    "Tuyên Quang": {
        "dish": "Gỏi Cá Bỗng Sông Lô",
        "region": "North",
        "description": "Cá bỗng tươi ngon được chế biến cầu kỳ, ăn kèm hạt chuối nướng.",
        "story": "Cá bỗng là loài cá quý vùng nước sâu sông Lô. Món gỏi dùng chín xương cá bỗng băm nhỏ, rang vàng, tạo nên vị béo bùi đặc trưng của xứ Tuyên.",
        "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop"
    },
    "Lào Cai": {
        "dish": "Thắng Cố Sa Pa",
        "region": "North",
        "description": "Đặc sản của người Mông với hương vị núi rừng Tây Bắc đặc trưng.",
        "story": "Thắng Cố là món ăn truyền thống của người H'Mông. Khi xưa, món ăn này được nấu từ thịt ngựa, dùng trong các phiên chợ vùng cao để gắn kết cộng đồng.",
        "image": "img/thangcosapa.jpg"
    },
    "Điện Biên": {
        "dish": "Gà Nướng Mắc Khén",
        "region": "North",
        "description": "Gà đồi nướng tẩm gia vị hạt mắc khén thơm nồng của Tây Bắc.",
        "story": "Gà dùng nướng phải là gà đồi thả rông, được tẩm ướp cùng hạt mắc khén. Món ăn này thể hiện tinh hoa ẩm thực của dân tộc Thái vùng Điện Biên.",
        "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop"
    },
    "Lai Châu": {
        "dish": "Lợn Cắp Nách",
        "region": "North",
        "description": "Thịt lợn rừng thả rông, săn chắc, bì giòn và mỡ thơm.",
        "story": "Tên gọi 'cắp nách' bắt nguồn từ hình ảnh người dân ôm con lợn nhỏ đi chợ phiên. Thịt lợn Lai Châu thơm ngon vì được nuôi tự nhiên nơi biên viễn.",
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop"
    },
    "Sơn La": {
        "dish": "Pa Pỉnh Tộp",
        "region": "North",
        "description": "Cá suối nướng gập, ướp mắc khén mang đậm hương vị Thái.",
        "story": "Trong tiếng Thái, 'Pa' là cá, 'Pỉnh Tộp' là nướng gập. Đây là món ăn quý tiếp đãi khách phương xa, thể hiện lòng hiếu khách của người Tây Bắc.",
        "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop"
    },
    "Yên Bái": {
        "dish": "Xôi Ngũ Sắc Tú Lệ",
        "region": "North",
        "description": "Xôi nếp thơm nồng nàn với 5 màu rực rỡ từ lá rừng tự nhiên.",
        "story": "Nếp Tú Lệ trứ danh với hạt gạo to tròn. Xôi ngũ sắc tượng trưng cho Ngũ hành và sự hòa hợp của đất trời vùng cao Yên Bái.",
        "image": "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&h=400&fit=crop"
    },
    "Hòa Bình": {
        "dish": "Lợn Mán Thui Luộc",
        "region": "North",
        "description": "Thịt lợn mán thui vàng rơm, thái mỏng, thơm mùi lá rừng.",
        "story": "Lợn mán Hòa Bình được nuôi thả tự nhiên trên đồi. Lớp da thui vàng giòn, phần thịt chắc ngọt chấm cùng muối hạt dổi tạo nên hương vị núi rừng khó quên.",
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop"
    },
    "Thái Nguyên": {
        "dish": "Chè Tân Cương",
        "region": "North",
        "description": "Đệ nhất danh trà với màu nước xanh vàng, vị chát dịu hậu ngọt.",
        "story": "Thái Nguyên là 'thủ phủ' trà. Chè Tân Cương được nuôi dưỡng bởi thổ nhưỡng vùng trung du, mang hương vị đẳng cấp 'đệ nhất trà đại ngàn'.",
        "image": "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&h=400&fit=crop"
    },
    "Lạng Sơn": {
        "dish": "Vịt Quay Mắc Mật",
        "region": "North",
        "description": "Vịt quay da vàng óng, thịt ngọt thơm mùi lá mắc mật rừng.",
        "story": "Bí quyết của vịt quay Lạng Sơn là lá mắc mật rừng. Vịt quay trên than hồng cho đến khi da giòn rụm, thịt thấm đẫm thảo mộc.",
        "image": "img/vitquaymacmat.jpg"
    },
    "Quảng Ninh": {
        "dish": "Chả Mực Hạ Long",
        "region": "North",
        "description": "Mực tươi giã tay tinh tế, chiên vàng giòn thơm nức mũi.",
        "story": "Chả mực Hạ Long giữ độ giòn sần sật đặc trưng nhờ giã tay. Đây là đặc sản của vùng vịnh di sản, niềm tự hào của người dân Đất Mỏ.",
        "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
    },
    "Bắc Giang": {
        "dish": "Vải Thiều Lục Ngạn",
        "region": "North",
        "description": "Trái vải vỏ mỏng, hạt nhỏ, vị ngọt thanh mát lịm.",
        "story": "Vải thiều Lục Ngạn đã vươn tầm thế giới. Nhờ thổ nhưỡng đặc biệt, trái vải nơi đây có hương vị ngọt lịm đặc trưng không nơi nào có được.",
        "image": "img/vaithieulucngan.jpg"
    },
    "Phú Thọ": {
        "dish": "Thịt Chua Thanh Sơn",
        "region": "North",
        "description": "Đặc sản của người Mường, làm từ thịt lợn lên men thính ngô.",
        "story": "Thịt chua là cách bảo quản sáng tạo của người Mường. Thịt được trộn thính ngô rang, ủ trong ống tre tạo nên vị chua thanh bùi béo.",
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop"
    },
    "Vĩnh Phúc": {
        "dish": "Bánh Trùng Mật Mía",
        "region": "North",
        "description": "Bánh từ bột nếp, nấu trong mật mía sóng sánh thơm mùi gừng.",
        "story": "Bánh Trùng Vĩnh Tường đỏ au màu cánh gián, dẻo thơm nồng nàn. Món bánh gắn liền với phong tục thờ cúng truyền thống của người dân Vĩnh Phúc.",
        "image": "img/banhtrungmatmia.webp"
    },
    "Bắc Ninh": {
        "dish": "Bánh Phu Thê Đền Đô",
        "region": "North",
        "description": "Món bánh dẻo thơm tượng trưng cho tình nghĩa vợ chồng son sắt.",
        "story": "Bánh Phu Thê gắn với tích vua Lý Thánh Tông đi đánh giặc. Bánh có màu vàng dành dành, bọc lá dong xanh, nhân đậu xanh trắng ngọt bùi.",
        "image": "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop"
    },
    "Hải Dương": {
        "dish": "Bánh Đậu Xanh",
        "region": "North",
        "description": "Bánh mịn màng, tan trong miệng với vị ngọt thanh xứ Đông.",
        "story": "Từng được vua Bảo Đại sắc phong khen ngợi, bánh đậu xanh Hải Dương trở thành thức quà thanh tao dùng để mời trà khách quý.",
        "image": "img/banhdauxanh.jpg"
    },
    "Hải Phòng": {
        "dish": "Bánh Đa Cua",
        "region": "North",
        "description": "Sợi bánh đa đỏ giòn dai hòa cùng gạch cua béo ngậy.",
        "story": "Bánh đa đỏ phơi dưới nắng gió biển Đất Cảng tạo nên hương vị riêng biệt. Bát bánh đa cua chuẩn vị là niềm tự hào của người dân Hải Phòng.",
        "image": "https://images.unsplash.com/photo-1576577445504-6af96477db52?w=600&h=400&fit=crop"
    },
    "Hưng Yên": {
        "dish": "Nhãn Lồng Phố Hiến",
        "region": "North",
        "description": "Trái nhãn cùi dày, mọng nước, vị ngọt thanh tiến vua xưa.",
        "story": "Nhãn lồng Hưng Yên là biểu tượng cho sự trù phú của phố Hiến. Hạt nhỏ, cùi trắng ngà ngọt lịm mang đậm linh hồn đất nhãn.",
        "image": "img/nhanlongphohien.jpg"
    },
    "Thái Bình": {
        "dish": "Bánh Cáy Làng Nguyễn",
        "region": "North",
        "description": "Bánh dân dã từ nếp cái hoa vàng, mứt bí và vừng lạc.",
        "story": "Màu sắc bánh giống như trứng con cáy ngoài đồng. Bánh Cáy mang hồn cốt quê hương, gắn liền với kỹ nghệ gia truyền của người dân Thái Bình.",
        "image": "img/banhcaylangnguyen.jpg"
    },
    "Hà Nam": {
        "dish": "Cá Kho Làng Vũ Đại",
        "region": "North",
        "description": "Cá trắm đen kho niêu đất công phu suốt 14 tiếng đồng hồ.",
        "story": "Nổi tiếng với tên gọi cá kho Đại Hoàng. Cá được hầm bằng củi nhãn cho đến khi xương tan thịt chắc, thấm đẫm hương vị làng quê.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop"
    },
    "Nam Định": {
        "dish": "Phở Bò Giao Cù",
        "region": "North",
        "description": "Cái nôi của phở bò với bánh phở mềm và nước dùng xương.",
        "story": "Làng Giao Cù sản sinh ra những nghệ nhân phở tài ba. Phở Nam Định thơm mùi gừng hành nướng, là chuẩn mực phở truyền thống.",
        "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop"
    },
    "Ninh Bình": {
        "dish": "Cơm Cháy Chà Bông",
        "region": "North",
        "description": "Cơm cháy giòn rụm kết hợp với chà bông và mỡ hành thơm.",
        "story": "Làm từ gạo nếp hương chiên giòn tan. Món ăn này gắn liền với vùng đất cố đô cổ kính, thường ăn cùng nước sốt dê núi.",
        "image": "img/comchaychabong.jpg"
    },

    // Miền Trung (19 tỉnh thành)
    "Thanh Hóa": {
        "dish": "Nem Chua Thanh Hóa",
        "region": "Central",
        "description": "Nem thịt lên men tự nhiên với vị chua cay mặn ngọt hài hòa.",
        "story": "Sản vật trứ danh của xứ Thanh, được bọc trong lá chuối xanh. Vị giòn của bì heo, vị chua của thịt lên men tạo nên sự cuốn hút đặc biệt.",
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop"
    },
    "Nghệ An": {
        "dish": "Súp Lươn Xứ Nghệ",
        "region": "Central",
        "description": "Lươn đồng tươi ngon nấu cùng nghệ cay nồng, ăn kèm bánh mì.",
        "story": "Nghệ An sản sinh ra lươn đồng ngon nhất cả nước. Bát súp lươn nóng hổi là niềm tự hào và tình cảm chân chất của người dân miền Trung.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop"
    },
    "Hà Tĩnh": {
        "dish": "Kẹo Cu Đơ",
        "region": "Central",
        "description": "Bánh đa nướng kẹp mật mía và lạc rang bùi béo.",
        "story": "Cái tên 'Cu Đơ' mang đậm vẻ dân dã, hóm hỉnh của người Hà Tĩnh. Một sự hòa quyện tuyệt vời của vị ngọt mật mía và giòn tan bánh đa.",
        "image": "img/keocudo.jpg"
    },
    "Quảng Bình": {
        "dish": "Bánh Bột Lọc",
        "region": "Central",
        "description": "Lớp vỏ xanh mang nhân tôm thịt đậm vị, chấm mắm cay.",
        "story": "Bánh bột lọc Quảng Bình mang vị mặn mòi của biển cả. Mỗi chiếc bánh nhỏ xinh được gói lá chuối, mang theo cả tấm lòng người con xứ biển.",
        "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop"
    },
    "Quảng Trị": {
        "dish": "Bánh Khoái Quảng Trị",
        "region": "Central",
        "description": "Bánh chiên giòn nhân tôm thịt, ăn kèm rau sống và nước lèo đặc biệt.",
        "story": "Tên gọi 'Bánh Khoái' vì món ăn này mang lại cảm giác khoái chí khi thưởng thức. Vỏ bánh giòn rụm kết hợp nước lèo bùi ngậy từ gan lợn và lạc.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop"
    },
    "Thừa Thiên Huế": {
        "dish": "Bún Bò Huế",
        "region": "Central",
        "description": "Hương vị cung đình với sự kết hợp sả và mắm ruốc thanh tao.",
        "story": "Phản ánh chiều sâu văn hóa Cố đô. Nước dùng trong nhưng đậm đà, là di sản ẩm thực không thể thiếu của miền Trung.",
        "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop"
    },
    "Đà Nẵng": {
        "dish": "Mì Quảng",
        "region": "Central",
        "description": "Sợi mì dày vàng nghệ, ăn kèm tôm thịt và bánh tráng mè.",
        "story": "Mì Quảng là sợi dây kết nối quê hương của người dân Đà Thành. Sự phóng khoáng của miền Trung hội tụ trong bát mì đậm đà tình người.",
        "image": "img/miquang.png"
    },
    "Quảng Nam": {
        "dish": "Cao Lầu Hội An",
        "region": "Central",
        "description": "Sợi mì dai đặc chế ăn kèm thịt xá xíu và nước dùng ít.",
        "story": "Linh hồn phố cổ Hội An. Cao lầu mang dấu ấn giao thoa văn hóa độc đáo, chỉ ngon nhất khi nấu bằng nước giếng Bá Lễ.",
        "image": "img/caolauhoian.jpg"
    },
    "Quảng Ngãi": {
        "dish": "Cá Bống Sông Trà",
        "region": "Central",
        "description": "Cá bống nhỏ kho tiêu mặn ngọt, món quà đặc sản xứ Quảng.",
        "story": "Cá bống sông Trà là sản vật quý mà thiên nhiên ban tặng. Cá kho khô trong niêu đất, ăn cùng cơm trắng là vị ngon giản dị của tuổi thơ.",
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop"
    },
    "Bình Định": {
        "dish": "Bánh Ít Lá Gai",
        "region": "Central",
        "description": "Bánh dẻo đen bóng từ lá gai, nhân đậu xanh ngọt bùi.",
        "story": "Gắn liền với hình ảnh người con gái Bình Định khéo léo. Bánh ít lá gai không chỉ là món ăn mà còn là biểu tượng của lòng hiếu thảo.",
        "image": "img/banhitlagai.jpg"
    },
    "Phú Yên": {
        "dish": "Mắt Cá Ngừ Đại Dương",
        "region": "Central",
        "description": "Sản vật đại dương bổ dưỡng, hầm cùng thuốc bắc thơm lừng.",
        "story": "Phú Yên là cái nôi của nghề câu cá ngừ. Món mắt cá ngừ không chỉ là món ăn mà còn thể hiện sức mạnh và sự sáng tạo của ngư dân vùng biển.",
        "image": "img/matcangudaiduong.jpg"
    },
    "Khánh Hòa": {
        "dish": "Nem Nướng Ninh Hòa",
        "region": "Central",
        "description": "Nem thịt nướng thơm nức, cuốn cùng bánh tráng và tương chấm đặc biệt.",
        "story": "Đặc sản của vùng biển Nha Trang xanh mát. Sự kết hợp rực rỡ của rau xanh, thịt nướng và tương đậu tạo nên bàn tiệc ẩm thực hấp dẫn.",
        "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop"
    },
    "Ninh Thuận": {
        "dish": "Thịt Cừu Phan Rang",
        "region": "Central",
        "description": "Thịt cừu nướng đặc sản vùng nắng gió, thịt thơm và mềm.",
        "story": "Gắn liền với thảo nguyên nắng gió Phan Rang. Những bầy cừu trên đồi cát tạo ra nguồn thực phẩm quý giá mang đậm phong vị Tây Nguyên.",
        "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop"
    },
    "Bình Thuận": {
        "dish": "Lẩu Thả Mũi Né",
        "region": "Central",
        "description": "Trình bày rực rỡ trong bẹ hoa chuối với cá mai tươi sống.",
        "story": "Tượng trưng cho những cánh sen nở giữa đại dương. Lẩu thả là món ăn giải nhiệt tuyệt vời sau những giờ ra khơi giữa nắng vàng biển xanh.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop"
    },
    "Kon Tum": {
        "dish": "Gỏi Lá Kon Tum",
        "region": "Central",
        "description": "Tổng hòa của hơn 40 loại lá rừng Tây Nguyên và nước chấm đặc biệt.",
        "story": "Hội tụ linh hồn của đại ngàn. Gỏi lá Kon Tum là bản giao hưởng của vị chát, ngọt, bùi từ thảo mộc vùng cao cao nguyên.",
        "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop"
    },
    "Gia Lai": {
        "dish": "Phở Khô Gia Lai",
        "region": "Central",
        "description": "Món phở hai tô danh tiếng phố núi với sợi phở khô dai mịn.",
        "story": "Sự sáng tạo của ẩm thực Pleiku. Thực khách thưởng thức tô phở khô đậm vị thịt băm và tô nước lèo nóng hổi, thanh ngọt.",
        "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop"
    },
    "Đắk Lắk": {
        "dish": "Gà Sa Lửa Bản Đôn",
        "region": "Central",
        "description": "Gà đồi nướng trên bếp lửa hồng, da giòn rụm thơm mùi thảo mật.",
        "story": "Hương vị nồng nàn của thủ phủ cà phê. Gà được kẹp tre nướng theo cách xa xưa, mang đậm chất sử thi của vùng đất Cao Nguyên.",
        "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600&h=400&fit=crop"
    },
    "Đắk Nông": {
        "dish": "Canh Thụt Ống Tre",
        "region": "Central",
        "description": "Món canh rau rừng nấu trong ống tre dân dã của người M'Nông.",
        "story": "Món ăn độc đáo mang hơi thở rừng già. Các loại rau, thịt được ninh nhừ trong ống tre xanh, giữ trọn vị ngọt tự nhiên của núi rừng.",
        "image": "img/canhthutongtre.jpg"
    },
    "Lâm Đồng": {
        "dish": "Canh Atisô Hầm Giò Heo",
        "region": "Central",
        "description": "Món canh bổ dưỡng thanh mát từ loài hoa đặc trưng Đà Lạt.",
        "story": "Thánh địa sương mù Lâm Đồng ban tặng Atisô quý giá. Món canh hầm này giúp giải nhiệt và bồi bổ sức khỏe cho con người xứ lạnh.",
        "image": "img/canhaitsohamgioheo.jpg"
    },

    // Miền Nam (19 tỉnh thành)
    "Bình Phước": {
        "dish": "Hạt Điều Rang Muối",
        "region": "South",
        "description": "Hạt điều giòn tan, béo ngậy sản vật vươn tầm thế giới.",
        "story": "Bình Phước là vương quốc hạt điều. Những hạt điều vàng ươm là minh chứng cho sự cần cù và trù phú của vùng đất miền Đông.",
        "image": "img/hatdieurangmuoi.jpg"
    },
    "Tây Ninh": {
        "dish": "Bánh Tráng Phơi Sương",
        "region": "South",
        "description": "Bánh tráng dẻo thơm nhờ sương đêm, đặc sản Trảng Bàng.",
        "story": "Phơi dưới sương khuya từ 2-4 giờ sáng để đạt độ dẻo. Đây là sản phẩm kết tinh từ sự sáng tạo của người dân vùng đất tâm linh.",
        "image": "img/banhtrangphoisuong.jpg"
    },
    "Bình Dương": {
        "dish": "Gỏi Gà Măng Cụt",
        "region": "South",
        "description": "Sự kết hợp tinh túy giữa gà thả vườn và măng cụt xanh xứ Lái Thiêu.",
        "story": "Thức quà mùa hè rực rỡ của Bình Dương. Măng cụt xanh giòn, vị chua ngọt hòa cùng gà chắc thịt tạo nên món gỏi 'vua' của vùng Đông Nam Bộ.",
        "image": "img/goigamangcut.jpg"
    },
    "Đồng Nai": {
        "dish": "Bưởi Tân Triều",
        "region": "South",
        "description": "Món gà hấp bưởi hoặc gỏi bưởi thanh tao, mọng nước vùng ven sông.",
        "story": "Bưởi Tân Triều nổi danh từ xưa. Ngoài trái cây, người Đồng Nai còn sáng tạo ra món gà hấp trong vỏ bưởi vô cùng độc đáo.",
        "image": "img/buoitrantrieu.png"
    },
    "Bà Rịa - Vũng Tàu": {
        "dish": "Bánh Khọt Vũng Tàu",
        "region": "South",
        "description": "Bánh chiên giòn rụm với tôm tươi, ăn kèm rau sống và mắm chua ngọt.",
        "story": "Biểu tượng ẩm thực phố biển Vũng Tàu. Tiếng bánh xèo xèo trên khuôn đồng gợi nhớ đến không khí nhộn nhịp của ngư dân buổi sớm.",
        "image": "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop"
    },
    "TP Hồ Chí Minh": {
        "dish": "Cơm Tấm Sườn Bì Chả",
        "region": "South",
        "description": "Hạt gạo tấm gãy, sườn nướng mật ong và bì thính vàng ươm.",
        "story": "Hồn cốt ẩm thực Sài Gòn. Cơm tấm đã trở thành món ăn di sản, đại diện cho nhịp sống sôi động và phóng khoáng của miền Nam.",
        "image": "img/comtamsuongbicha.jpg"
    },
    "Long An": {
        "dish": "Lạp Xưởng Cần Đước",
        "region": "South",
        "description": "Lạp xưởng thủ công phơi nắng mang vị ngọt đặc trưng miền Tây.",
        "story": "Đặc sản nức tiếng vùng Đất Đỏ Long An. Lạp xưởng không chỉ là món ngon ngày Tết mà còn là món quà ý nghĩa từ bàn tay tài hoa của nghệ nhân.",
        "image": "img/lapxuongcanduoc.png"
    },
    "Tiền Giang": {
        "dish": "Hủ Tiếu Mỹ Tho",
        "region": "South",
        "description": "Sợi hủ tiếu dai làm từ lúa thơm Gò Cát, nước dùng ngọt tôm khô.",
        "story": "Vị ngon rạng danh Tiền Giang. Hủ tiếu Mỹ Tho nổi tiếng nhờ sự hòa quyện của hải sản và sợi bánh dai ngon nức tiếng.",
        "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=400&fit=crop"
    },
    "Bến Tre": {
        "dish": "Kẹo Dừa Bến Tre",
        "region": "South",
        "description": "Dẻo thơm ngọt ngào kết tinh từ nước cốt dừa nguyên chất xứ Dừa.",
        "story": "Ra đời từ Mỏ Cày, hạt gạo nếp và nước cốt dừa hòa quyện tạo nên tinh hoa, mang theo tấm lòng nồng hậu của người Nam Bộ.",
        "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop"
    },
    "Trà Vinh": {
        "dish": "Bún Nước Lèo",
        "region": "South",
        "description": "Đặc sản giao thoa văn hóa Việt-Khmer với nước dùng mắm bò hóc đậm vị.",
        "story": "Dấu ấn văn hóa đặc sắc Trà Vinh. Bát bún nghi ngút khói hội tụ tinh hoa làng nghề và tình đoàn kết các dân tộc anh em.",
        "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&h=400&fit=crop"
    },
    "Vĩnh Long": {
        "dish": "Cá Tai Tượng Chiên Xù",
        "region": "South",
        "description": "Cá tai tượng chiên nguyên con, vảy dựng đứng giòn rụm bên ngoài.",
        "story": "Minh chứng cho sự hào sảng vùng sông nước Vĩnh Long. Món cá chiên cuộn với bánh tráng và rau vườn là thức quà từ dòng tiền giang.",
        "image": "img/cataituongchienxu.jpg"
    },
    "Đồng Tháp": {
        "dish": "Nem Lai Vung",
        "region": "South",
        "description": "Nem đỏ hồng tươi rói, vị chua ngọt đặc trưng vùng đất Sen Hồng.",
        "story": "Gắn liền với làng nghề làm nem truyền thống. Mỗi chiếc nem Lai Vung gói lá chuối là biểu tượng cho sự khéo léo và thịnh vượng.",
        "image": "img/namlaivung.jpg"
    },
    "An Giang": {
        "dish": "Bún Cá Châu Đốc",
        "region": "South",
        "description": "Bát bún vàng màu nghệ với cá lóc đồng, nước lèo mắm cá linh đậm đà.",
        "story": "Vị ngon tâm linh vùng đất Bảy Núi An Giang. Bát bún cá là sự kết hợp mộc mạc mà tinh tế giữa đồng ruộng và tâm hồn hiền hậu.",
        "image": "img/buncachaudoc.jpg"
    },
    "Kiên Giang": {
        "dish": "Bún Quậy Phú Quốc",
        "region": "South",
        "description": "Thực khách tự pha nước chấm, hải sản tươi quậy thơm nồng đảo Ngọc.",
        "story": "Sự trải nghiệm độc đáo giữa đảo xa. Gắn liền với sự phóng khoáng của ngư dân Phú Quốc, mang hương vị tươi mới của biển khơi.",
        "image": "img/bunquayphuquoc.jpg"
    },
    "Cần Thơ": {
        "dish": "Vịt Nấu Chao",
        "region": "South",
        "description": "Vịt thả vườn nấu cùng chao đỏ béo ngậy, thức quà Tây Đô.",
        "story": "Bản sắc văn hóa sông nước Cần Thơ. Vị thơm nồng của chao và thịt vịt mềm tạo nên không gian ấm cúng trong những bữa cơm gia đình.",
        "image": "img/vitnauchao.jpg"
    },
    "Hậu Giang": {
        "dish": "Chả Cá Thác Lác",
        "region": "South",
        "description": "Cá thác lác tươi quết dai ngon, giòn ngọt tự nhiên từ sông nước.",
        "story": "Niềm tự hào Hậu Giang. Sự kiên trì quết cá bằng tay tạo nên độ dai ngon bậc nhất, là tinh hoa của ẩm thực miệt vườn.",
        "image": "img/chacathaclac.webp"
    },
    "Sóc Trăng": {
        "dish": "Bánh Pía Trung Thu",
        "region": "South",
        "description": "Hương vị sầu riêng và trứng muối mặn mà của bà Trà.",
        "story": "Gắn liền với lịch sử giao thoa văn hóa Sóc Trăng. Sự hòa quyện tuyệt vời của vị ngọt bùi, mang theo tâm tình từ xứ sở bún nước lèo.",
        "image": "img/banhpiatrungthu.jpg"
    },
    "Bạc Liêu": {
        "dish": "Bún Bò Cay",
        "region": "South",
        "description": "Nước bún bò đỏ rực vị ớt, đậm đà theo phong cách công tử Bạc Liêu.",
        "story": "Phản ánh cá tính hào sảng xứ Bạc Liêu. Hương vị cay nồng thách thức thực khách, là món ăn tinh thần gắn bó với người dân địa phương.",
        "image": "img/bunbocay.jpg"
    },
    "Cà Mau": {
        "dish": "Cua Năm Căn",
        "region": "South",
        "description": "Cua biển chắc thịt ngon nhất nước từ rừng ngập mặn cực Nam.",
        "story": "Món quà từ đất mũi Cà Mau. Cua Năm Căn thịt ngọt lịm, gạch béo, là minh chứng cho sự trù phú nơi tận cùng Tổ quốc.",
        "image": "img/cuanamcan.jpg"
    },

    // Quần đảo
    "Hoàng Sa": {
        "dish": "Hải Sản Biển Đông",
        "region": "Central",
        "description": "Sản vật quý từ ngư trường truyền thống của Việt Nam.",
        "story": "Ngư trường Hoàng Sa với hải sản tươi ngon luôn là niềm tự hào về chủ quyền và tài nguyên biển của dân tộc.",
        "image": "img/haisanbiendong.jpg"
    },
    "Trường Sa": {
        "dish": "Sản Vật Biển Đảo",
        "region": "Central",
        "description": "Các món quà thanh khiết từ đại dương đảo xa Trường Sa.",
        "story": "Trường Sa kiên cường giữa trùng khơi ban tặng những hải sản quý báu, mang hương vị mặn mòi nguyên bản của biển cả Tổ quốc.",
        "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop"
    }
};

// Đảm bảo không còn tỉnh nào bị bỏ sót trong logic hiển thị
const allProvinces = [
    "Hà Nội", "Hà Giang", "Cao Bằng", "Bắc Kạn", "Tuyên Quang", "Lào Cai", "Điện Biên", "Lai Châu", "Sơn La", "Yên Bái",
    "Hòa Bình", "Thái Nguyên", "Lạng Sơn", "Quảng Ninh", "Bắc Giang", "Phú Thọ", "Vĩnh Phúc", "Bắc Ninh", "Hải Dương", "Hải Phòng",
    "Hưng Yên", "Thái Bình", "Hà Nam", "Nam Định", "Ninh Bình", "Thanh Hóa", "Nghệ An", "Hà Tĩnh", "Quảng Bình", "Quảng Trị",
    "Thừa Thiên Huế", "Đà Nẵng", "Quảng Nam", "Quảng Ngãi", "Bình Định", "Phú Yên", "Khánh Hòa", "Ninh Thuận", "Bình Thuận", "Kon Tum",
    "Gia Lai", "Đắk Lắk", "Đắk Nông", "Lâm Đồng", "Bình Phước", "Tây Ninh", "Bình Dương", "Đồng Nai", "Bà Rịa - Vũng Tàu", "TP Hồ Chí Minh",
    "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Vĩnh Long", "Đồng Tháp", "An Giang", "Kiên Giang", "Cần Thơ", "Hậu Giang",
    "Sóc Trăng", "Bạc Liêu", "Cà Mau", "Hoàng Sa", "Trường Sa"
];
